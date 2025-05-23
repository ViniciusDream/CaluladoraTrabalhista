document.getElementById("calcularBtn").addEventListener("click", function() {
    const valorHora = parseFloat(document.getElementById("valorHora").value);
    const qtdeHoras = parseFloat(document.getElementById("qtdeHoras").value);
    const valeTransporte = document.getElementById("valeTransporte").value;
    const outrasDeducoes = parseFloat(document.getElementById("outrasDeducoes").value);

    if (isNaN(valorHora) || isNaN(qtdeHoras) || isNaN(outrasDeducoes)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const salarioBruto = valorHora * qtdeHoras;

    let descontoINSS = 0;
    if (salarioBruto <= 1320.00) {
        descontoINSS = salarioBruto * 0.075;
    } else if (salarioBruto <= 2571.29) {
        descontoINSS = (1320.00 * 0.075) + ((salarioBruto - 1320.00) * 0.09);
    } else if (salarioBruto <= 3856.94) {
        descontoINSS = (1320.00 * 0.075) + ((2571.29 - 1320.00) * 0.09) + ((salarioBruto - 2571.29) * 0.12);
    } else if (salarioBruto <= 7507.49) {
        descontoINSS = (1320.00 * 0.075) + ((2571.29 - 1320.00) * 0.09) + ((3856.94 - 2571.29) * 0.12) + ((salarioBruto - 3856.94) * 0.14);
    }

    let descontoIRPF = 0;
    const baseCalculoIRPF = salarioBruto - descontoINSS;
    if (baseCalculoIRPF > 2112.00) {
        if (baseCalculoIRPF <= 2826.65) {
            descontoIRPF = (baseCalculoIRPF - 2112.00) * 0.075;
        } else if (baseCalculoIRPF <= 3751.06) {
            descontoIRPF = (2826.65 - 2112.00) * 0.075 + (baseCalculoIRPF - 2826.65) * 0.15;
        } else if (baseCalculoIRPF <= 4664.68) {
            descontoIRPF = (2826.65 - 2112.00) * 0.075 + (3751.06 - 2826.65) * 0.15 + (baseCalculoIRPF - 3751.06) * 0.225;
        } else {
            descontoIRPF = (2826.65 - 2112.00) * 0.075 + (3751.06 - 2826.65) * 0.15 + (4664.68 - 3751.06) * 0.225 + (baseCalculoIRPF - 4664.68) * 0.275;
        }
    }

    const descontoValeTransporte = valeTransporte === 'S' ? salarioBruto * 0.06 : 0;
    const salarioLiquido = salarioBruto - descontoINSS - descontoIRPF - descontoValeTransporte - outrasDeducoes;

    document.getElementById("salarioBruto").textContent = `Salário Bruto: R$ ${salarioBruto.toFixed(2)}`;
    document.getElementById("descontoINSS").textContent = `Desconto INSS: R$ ${descontoINSS.toFixed(2)}`;
    document.getElementById("descontoIRPF").textContent = `Desconto IRPF: R$ ${descontoIRPF.toFixed(2)}`;
    document.getElementById("descontoValeTransporte").textContent = `Desconto Vale Transporte: R$ ${descontoValeTransporte.toFixed(2)}`;
    document.getElementById("outrasDeducoesResultado").textContent = `Outras Deduções: R$ ${outrasDeducoes.toFixed(2)}`;
    document.getElementById("salarioLiquido").textContent = `Salário Líquido: R$ ${salarioLiquido.toFixed(2)}`;

    document.getElementById("resultado").style.display = 'block';
});
