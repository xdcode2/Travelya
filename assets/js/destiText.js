function DestinationText({ id, title, desc }) {
    return `
        <div class="destination-text" data-id="${id}">
            <h1 class="heading">${title}</h1>
            <p class="text">${desc}</p>
        </div>
    `;
}

export default DestinationText;
