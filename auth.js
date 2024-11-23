import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { redirect } from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";

// Validasi login berdasarkan cookie
if (getCookie("login") === "") {
    redirect("/"); // Redirect ke login jika belum login
}

// Ambil data user
getJSON("https://api.do.my.id/data/user", "login", getCookie("login"), validateRole);

function validateRole(result) {
    if (result.status === 404) {
        setInner("content", "Silahkan lakukan pendaftaran terlebih dahulu " + result.data.name);
        redirect("/signup");
    } else {
        // Cek role untuk mengarahkan halaman
        const userRole = result.data.role;

        // Role yang diizinkan untuk mengakses halaman home
        const allowedRolesForHome = ["user", "dosen"];

        if (allowedRolesForHome.includes(userRole)) {
            redirect("/home"); // Arahkan user atau dosen ke halaman home
        } else if (userRole === "admin") {
            redirect("/admin/dashboard"); // Arahkan admin ke dashboard admin
        } else if (userRole === "cashier") {
            redirect("/cashier/dashboard"); // Arahkan cashier ke dashboard cashier
        } else {
            setInner("content", "Role tidak dikenali.");
            redirect("/");
        }
    }
}
