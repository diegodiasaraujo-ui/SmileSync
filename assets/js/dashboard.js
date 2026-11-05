document.addEventListener("DOMContentLoaded", () => {
    const logado = localStorage.getItem("isLoggedIn");

    if (!logado) {
        alert("Você precisa fazer login primeiro!");
        window.location.href = "login.html";
        return;
    }

    const openBtn = document.getElementById("open-drawer-btn"); 
    const drawer = document.getElementById("patient-drawer");
    const closeBtn = document.getElementById("close-drawer");
    const cancelBtn = document.getElementById("cancel-drawer");
    const form = document.getElementById("new-patient-form");

    function openDrawer(event) {
        event.preventDefault();
        drawer.classList.add("is-open");
    }

    function closeDrawer() {
        drawer.classList.remove("is-open");
        form.reset();
    }

    if (openBtn) {
        openBtn.addEventListener("click", openDrawer);
    }

    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (cancelBtn) closeBtn.addEventListener("click", closeDrawer);

    if (drawer) {
        drawer.addEventListener("click", (event) => {
            if (event.target === drawer) {
                closeDrawer();
            }
        });
    }


    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const nome = document.getElementById("patient-name").value.trim();
            const telefone = document.getElementById("patient-phone").value.trim();
            const email = document.getElementById("patient-email").value.trim();
            const cidade = document.getElementById("patient-city").value.trim();
            const observacoes = document.getElementById("patient-obs").value.trim();

            const novoPaciente = {
                id: Date.now(),
                nome: nome,
                telefone: telefone,
                email: email,
                cidade: cidade,
                observacoes: observacoes,
                consulta: "A definir",
                tratamento: "Sem tratamento",
                contratado: 0,
                pago: 0,
                aberto: 0,
                statusFin: "Sem cobrança",
                statusTrat: "Sem tratamento"
            };

            const pacientes = JSON.parse(localStorage.getItem("smileSync_pacientes")) || [];
            pacientes.push(novoPaciente);
            localStorage.setItem("smileSync_pacientes", JSON.stringify(pacientes));

            alert("Paciente cadastrado com sucesso!");
            closeDrawer();
        });
    }
});