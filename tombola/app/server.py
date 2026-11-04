"""Server Tombola - solo libreria standard Python, nessuna dipendenza esterna."""
import http.server
import json
import os
import socket
import threading
import webbrowser
from urllib.parse import urlparse

PORT = 8000
PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")

state_lock = threading.Lock()
state = {"drawn": [], "remaining": [], "current": None}


def reset_game():
    state["drawn"] = []
    state["remaining"] = list(range(1, 91))
    state["current"] = None


reset_game()


class TombolaHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/state":
            with state_lock:
                self._send_json(state)
            return
        if parsed.path == "/":
            self.path = "/index.html"
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/draw":
            length = int(self.headers.get("Content-Length", 0))
            raw_body = self.rfile.read(length) if length else b""
            try:
                payload = json.loads(raw_body) if raw_body else {}
            except json.JSONDecodeError:
                payload = {}
            with state_lock:
                try:
                    number = int(payload.get("number"))
                except (TypeError, ValueError):
                    self._send_json({"error": "Numero non valido"}, status=400)
                    return
                if number < 1 or number > 90:
                    self._send_json({"error": "Il numero deve essere tra 1 e 90"}, status=400)
                    return
                if number not in state["remaining"]:
                    self._send_json({"error": "Numero già estratto"}, status=400)
                    return
                state["remaining"].remove(number)
                state["drawn"].append(number)
                state["current"] = number
                self._send_json(state)
            return
        if parsed.path == "/api/reset":
            with state_lock:
                reset_game()
                self._send_json(state)
            return
        self.send_error(404)

    def log_message(self, format, *args):
        pass  # console più pulita, niente log di ogni richiesta


def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()


def main():
    ip = get_local_ip()
    print("=" * 55)
    print(" SERVER TOMBOLA AVVIATO")
    print("=" * 55)
    print(f" Su QUESTO PC (regia):      http://localhost:{PORT}/host.html")
    print(f" Sull'ALTRO PC (tabellone): http://{ip}:{PORT}/board.html")
    print("=" * 55)
    print(" Lascia questa finestra aperta finché giochi.")
    print(" Chiudi questa finestra (o premi CTRL+C) per fermare il server.")
    print()

    try:
        webbrowser.open(f"http://localhost:{PORT}/host.html")
    except Exception:
        pass

    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), TombolaHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer arrestato.")


if __name__ == "__main__":
    main()
