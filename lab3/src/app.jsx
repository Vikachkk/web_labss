import { useState } from 'react' //"память" React
import './App.css'               //стили

function App() {
  //память
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //загрузка
  const loadPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');

      //всё ли ок, проверкк
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }

      const data = await response.json();

      //данные в память
      setPosts(data);

    } catch (error) {
      //если инет упал
      console.error('Произошла ошибка:', error);

    } finally {
      //если всё ок или если была ошибка - выкл режим загрузки
      setLoading(false);
    }
  };

  //отрисовка
  return (
    <main className="container">
      <h1> Каталог постов (React)</h1>
      <p>Нажми на кнопку, чтобы загрузить данные с сервера</p>

      {/*вызывает функцию loadPosts, если loading=true, она блокируется */}
      <button onClick={loadPosts} disabled={loading}>
        {loading ? 'Загрузка..' : 'Загрузить посты'}
      </button>

      <section className="posts-container">

        {/* если в памяти есть данные,проходим циклом и рисуем карточки */}
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ))}

      </section>
    </main>
  )
}

export default App //доступ для всего приложения