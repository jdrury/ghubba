export function Login() {
  return (
    <section>
      <h1>hi ando</h1>
      {/* TODO use shared env value */}
      <a
        href="https://github.com/login/oauth/authorize?client_id=Iv23liAxcjrsJ9ErRsfu"
        className="text-blue-500"
      >
        Login with GitHub
      </a>
    </section>
  );
}
