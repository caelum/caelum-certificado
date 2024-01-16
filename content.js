(() => {

    document.addEventListener('DOMContentLoaded', function () {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.size !== 6) return;

        const hasAllCorrectParameters = urlParams.has('name') && urlParams.has('curso') && urlParams.has('cargaHoraria') && urlParams.has('dataFim') && urlParams.has('dataFim') && urlParams.has('nomeInstrutor');
        if (!hasAllCorrectParameters) return;
        
        document.getElementById('form').classList.add('--hidden');

        const nome = urlParams.get('name');
        const curso = urlParams.get('curso');
        const cargaHoraria = urlParams.get('cargaHoraria');
        const dataInicio = urlParams.get('dataInicio');
        const dataFim = urlParams.get('dataFim');
        const nomeInstrutor = urlParams.get('nomeInstrutor');

        _replaceUrl(urlParams, dataInicio, dataFim);

        
        _setAttributes({
            nome,
            curso,
            cargaHoraria,
            dataInicio,
            dataFim,
            nomeInstrutor
        });
    });

    function _setAttributes(dados) {
        const updateElement = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerText = value;
            }
        };

        updateElement("nomeAluno", dados.nome);
        updateElement("descricao", dados.curso);
        updateElement("duracao", dados.cargaHoraria);
        updateElement("inicio", _formatDate(dados.dataInicio));
        updateElement("fim", _formatDate(dados.dataFim));
        updateElement("instrutor", dados.nomeInstrutor);
    }

    function _replaceUrl(urlParams, dataInicio, dataFim) {
        urlParams.set('dataInicio', _formatDate(dataInicio));
        urlParams.set('dataFim', _formatDate(dataFim));

        let url = window.location.href;
        let novaQuery = decodeURIComponent(urlParams.toString());

        let novaUrl = url.split('?')[0] + '?' + novaQuery;
        window.history.replaceState(null, null, novaUrl);
    }

    function _formatDate(dateString) {
        console.log(dateString)
        if (/\d{2}\/\d{2}\/\d{4}/.test(dateString)) {
            return dateString;
        }

        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString + 'T00:00:00');
        console.log(date)
        return date.toLocaleDateString('pt-BR', options);
    }
})()