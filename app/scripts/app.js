document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on('app.activated', vm.init());
    }
  }
};

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}

const App = {
  data() {
    return {
      messageTitle: '',
      messageText: '',
    };
  },
  methods: {
    init() {
      vm.getMessage();
    },

    getMessage() {
      client.iparams.get().then(
        function (data) {
          vm.messageDate = data.message_date;
          vm.messageTitle = data.message_title;
          vm.messageText = data.message_text;
        },
        function (error) {
          console.log(error);
          // failure operation
        }
      );
    },
  },
};

const vm = Vue.createApp(App).mount('#app-body');
