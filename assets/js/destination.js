function Destination({ id, title, image }) {
    return `
        <div class="destination swiper-slide" data-id="${id}">
            <div class="destination__image">
                <img src="${image}" alt="${title}" />
            </div>
        </div>    
    `;
}
export default Destination;
