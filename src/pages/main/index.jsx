import { pageRoutes } from "../../app/routes";
import { Link } from "react-router-dom";
import "./styles.css";

export function MainPage() {
  return (
    <main>
      {pageRoutes.map(({ path, title }) => (
        <Link key={path} to={path} className="task-btn">
          {title}
        </Link>
      ))}
    </main>
  );
}
