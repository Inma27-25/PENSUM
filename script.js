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
            if (!btn.classList.contains("aprobada") && prereqs.length > 0 && prereqs[0] !== "") {
                const requisitosAprobados = prereqs.every(id => {
                    const req = document.getElementById(id.trim());
                    return req && req.classList.contains("aprobada");
                });
                btn.disabled = !requisitosAprobados;
            } else if (prereqs.length === 0 || prereqs[0] === "") {
                btn.disabled = false;
            }
        });
    }
});
