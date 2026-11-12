//элементы на странице по их ID 
const loadButton = document.getElementById('loadBtn');
const postsContainer = document.getElementById('postsContainer');

//асинхронная функция (она умеет ждать ответ от сервера, не зависая)
async function fetchPosts() {

    loadButton.textContent = 'Загрузка...';
    loadButton.disabled = true; // блок кнопку, чтобы не нажимали 100 раз

    try {
        //Ajax-запрос с помощью fetch
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }

        //ответ сервера из формата JSON в JavaScript-объекты
        const posts = await response.json();

        //очистка контейнера
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const card = document.createElement('article');
            card.classList.add('post-card');

            card.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;

            postsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Произошла ошибка:', error);
        postsContainer.innerHTML = `<p style="color: red;">Не удалось загрузить данные. Проверьте интернет.</p>`;
    } finally {
        // Этот блок выполняется ВСЕГДА (и при успехе, и при ошибке)
        loadButton.textContent = 'Загрузить посты';
        loadButton.disabled = false;
    }
}

loadButton.addEventListener('click', fetchPosts);

