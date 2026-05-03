async function register() {
    const username = u.value;
    const password = p.value;

    const req = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    out.textContent = await req.text();
}

async function login() {
    const username = u.value;
    const password = p.value;

    const req = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await req.json();
    localStorage.setItem("token", data.token);
    out.textContent = JSON.stringify(data, null, 2);
}

async function me() {
    const req = await fetch("/api/me", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });

    out.textContent = await req.text();
}
