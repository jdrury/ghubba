import { FormEvent } from "react";
import { useNavigate } from "react-router";

function UserSearch() {
  const navigate = useNavigate();

  const handleSearch = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const login = formData.get("login");
    if (typeof login === "string" && login.length > 0) {
      navigate(`/${login}`);
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSearch}>
      <input
        type="text"
        name="login"
        className="border px-2"
        placeholder="Search by github handle..."
      />
      <button
        type="submit"
        className="bg-indigo-500 px-2 text-white border border-indigo-600"
      >
        Search
      </button>
    </form>
  );
}

export { UserSearch };
