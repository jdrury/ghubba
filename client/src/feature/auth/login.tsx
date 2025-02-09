function Login() {
  return (
    <section>
      <h1>hi ando</h1>

      <form action="/api/login" method="POST">
        <button type="submit">Login with GitHub</button>
      </form>
    </section>
  );
}

export { Login };
