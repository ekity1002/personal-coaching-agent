import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold">
              Personal Coaching Agent
            </Link>
            <nav className="flex gap-4">
              <Link to="/">
                <Button variant="ghost">ダッシュボード</Button>
              </Link>
              <Link to="/goals">
                <Button variant="ghost">目標</Button>
              </Link>
              <Link to="/chat">
                <Button variant="ghost">AIコーチ</Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
