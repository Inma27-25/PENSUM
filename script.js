document.addEventListener("DOMContentLoaded", () => {
    const materias = document.querySelectorAll(".materia");

    materias.forEach(btn => {
        btn.disabled = btn.dataset.prerequisitos ? true : false;
        btn.addEventListener("click", () => {
            btn.classList.toggle("aprobada");
            desbloquearMaterias();
        });
    });

    function desbloquearMaterias() {
        materias.forEach(btn => {
            const prereqs = btn.dataset.prerequisitos ? btn.dataset.prerequisitos.split(",") : [];
            if (prereqs.length > 0 && prereqs[0] !== "") {
                const requisitosAprobados = prereqs.every(id => {
                    const req = document.getElementById(id.trim());
                    return req && req.classList.contains("aprobada");
                });
                btn.disabled = !requisitosAprobados;
                if (requisitosAprobados) {
                    btn.classList.add("desbloqueada");
                } else {
                    btn.classList.remove("desbloqueada");
                }
            } else {
                btn.disabled = false;
            }
        });
    }
});
