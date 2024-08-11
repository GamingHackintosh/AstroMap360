document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('map-container');
    const width = container.clientWidth;
    const height = 500;
    const gWidth = width * 3; // Увеличиваем ширину группы <g> для размещения всех планет

    // Создаем SVG и группу <g>
    const svg = d3.select('#map-container').append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('width', gWidth)
        .attr('height', height);

    // Настраиваем зум и ограничиваем область перемещения
    const zoom = d3.zoom()
        .scaleExtent([0.5, 2]) // Ограничение на масштабирование
        .translateExtent([[0, 0], [gWidth, height]]) // Ограничение на перемещение
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    // Массив данных о планетах
    const planets = [
        { name: 'Меркурий', distance: 0.39, radius: 2.4, image: 'assets/img/planets/Mercury.png' },
        { name: 'Венера', distance: 0.95, radius: 6.1, image: 'assets/img/planets/Venus.png' },
        { name: 'Земля', distance: 1.5, radius: 6.3, image: 'assets/img/planets/Earth.png' },
        { name: 'Марс', distance: 2.5, radius: 3.4, image: 'assets/img/planets/Mars.png' },
        { name: 'Юпитер', distance: 5.2, radius: 69.9, image: 'assets/img/planets/Jupiter.png' },
        { name: 'Сатурн', distance: 9.58, radius: 58.2, image: 'assets/img/planets/Saturn.png' },
        { name: 'Уран', distance: 19.2, radius: 25.4, image: 'assets/img/planets/Uranus.png' },
        { name: 'Нептун', distance: 30.05, radius: 24.6, image: 'assets/img/planets/Neptune.png' }
    ];

    // Масштабирование дистанции и радиуса планет
    const maxPlanetSize = 435; // Максимальный размер планеты в пикселях
    const padding = 50; // Отступ между планетами
    const scaleDistance = d3.scaleLinear().domain([0, 30]).range([padding, gWidth - maxPlanetSize - padding]);
    const scaleRadius = d3.scaleSqrt().domain([0, 70]).range([10, maxPlanetSize / 2]);

    // Отрисовка планет
    g.selectAll('image')
        .data(planets)
        .enter()
        .append('image')
        .attr('xlink:href', d => d.image)
        .attr('x', d => scaleDistance(d.distance))
        .attr('y', height / 2 - maxPlanetSize / 2) // Центрируем по вертикали
        .attr('width', d => scaleRadius(d.radius) * 2)
        .attr('height', d => scaleRadius(d.radius) * 2)
        .attr('class', 'planet')
        .on('mouseover', function (event, d) {
            d3.select('#tooltip')
                .style('left', `${event.pageX + 5}px`)
                .style('top', `${event.pageY - 28}px`)
                .style('display', 'block')
                .html(`<strong>${d.name}</strong><br>Радиус: ${d.radius} тыс. км<br>Расстояние от Солнца: ${d.distance} а.е.`);
        })
        .on('mouseout', () => d3.select('#tooltip').style('display', 'none'));

    // Tooltip
    d3.select('body').append('div').attr('id', 'tooltip')
        .style('position', 'absolute')
        .style('padding', '10px')
        .style('background', 'rgba(0, 0, 0, 0.7)')
        .style('color', '#fff')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')
        .style('display', 'none');
});
