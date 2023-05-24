// Cargo el documento en JQuery para asegurarme de que el HTML se haya cargado por completo
$(document).ready(() => {
  // Evento click del botón calcular dentro del document.ready
  $("#btn-calcular").click(() => {
    const ingreso = $("#input-ingreso").val();
    $("#presupuesto").text(ingreso);
    $("#saldo").text(ingreso);
  });

  // Evento click del botón gasto (que los añade al costado)
  $("#btn-gasto").click(() => {
    const descripcion = $("#input-gasto").val();
    const cantidad = $("#input-valor").val();
    const presupuesto = parseInt($("#presupuesto").text());
    const gastos = parseInt($("#gastos").text());
    const saldo = parseInt($("#saldo").text());

    // Verificar si se ingresó un valor válido en el campo requerido, SINO arrojar mensaje
    if (
      descripcion.trim() === "" ||
      cantidad.trim() === "" ||
      parseInt(cantidad) <= 0
    ) {
      alert(
        "Por favor, ingresa un valor válido (nombre del gasto y un valor gasto superior a cero)."
      );
      return;
    }

    // Actualizar los gastos y el saldo
    $("#gastos").text(gastos + parseInt(cantidad));
    $("#saldo").text(saldo - parseInt(cantidad));

    // Crear un nuevo HTML para almacenar el nuevo gasto que incluye el tarrito de basura, con rebote
    const gastoHTML = `<tr> <td>${descripcion}</td>
                            <td>${cantidad}</td>
                            <td><i class="fas fa-trash-alt fa-bounce borrar-gasto"></i></td>
                      </tr>`;
    // Agregar el nuevo gasto a la lista de gastos registrados
    $("#gastos-registrados").append(gastoHTML);

    // Limpiar los campos de entrada
    $("#input-gasto").val("");
    $("#input-valor").val("");

    actualizarGastosRegistrados();
  });

  // Evento click del tarrito de basura para eliminar un gasto
  $(document).on("click", ".borrar-gasto", function () {
    const row = $(this).closest("tr");
    const cantidad = parseInt(row.find("td:nth-child(2)").text());
    const saldo = parseInt($("#saldo").text());

    // Remover el gasto de la lista
    row.remove();

    // Restar la cantidad eliminada para actualizar el saldo
    $("#gastos").text(parseInt($("#gastos").text()) - cantidad);
    $("#saldo").text(saldo + cantidad);
  });

  function actualizarGastosRegistrados() {
    const gastosRegistrados = $("#gastos-registrados tr");

    let totalGastos = 0;

    // Utilizar el método each de jQuery para calcular el total de gastos
    gastosRegistrados.each(function () {
      const cantidad = parseInt($(this).find("td:nth-child(2)").text());
      totalGastos += cantidad;
    });

    $("#gastos").text(totalGastos);
    $("#saldo").text(parseInt($("#presupuesto").text()) - totalGastos);
  }
});
