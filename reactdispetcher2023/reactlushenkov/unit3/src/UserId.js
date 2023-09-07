import { useParams } from "react-router-dom";

export default function UserId() {
  let {userName} = useParams();
  return (
    <div>
      <a href="/users">Назад</a>
      <h1>User: {userName}</h1>
    </div>
  );
}