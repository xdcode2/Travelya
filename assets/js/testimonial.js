function Testimonial({ id, name, comment, image }) {
    return `
        <div class="testimonial swiper-slide" data-id="${id}">
            <div class="testimonial__image">
                <img src="${image}" alt="${name}" />
            </div>
            <div class="testimonial__comment">
                <div class="testimonial__user">
                    <div class="user-image">
                        <img src="${image}" alt="${name}" />
                    </div>
                    <div class="user-name">
                        <h2>${name}</h2>
                    </div>
                </div>
                <div class="testimonial__text">
                    <p class="comment">"${comment}"</p>
                </div>
            </div>
        </div>
    `;
}

export default Testimonial;
