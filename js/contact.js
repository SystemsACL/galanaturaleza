/**
 * Gala Naturaleza — Contact Page Trip Planner
 * Generates structured WhatsApp message and email inquiry.
 * Zero external dependencies.
 */
document.addEventListener('DOMContentLoaded', function () {
  var planner = document.getElementById('trip-planner');
  if (!planner) return;

  var isEn = document.documentElement.lang === 'en';

  var state = {
    destination: 'Cozumel',
    interest: isEn ? 'birding' : 'observación de aves',
    group: isEn ? '1–2 people' : '1–2 personas',
    date: ''
  };

  var phone = '529871413620';
  var email = 'elvisfotografosilvestre@gmail.com';

  var waBtn = document.getElementById('planner-wa-btn');
  var emailLink = document.getElementById('planner-email-link');
  var previewEl = document.getElementById('planner-preview');
  var dateInput = document.getElementById('planner-date');

  function buildMessage() {
    var rawDate = (dateInput ? dateInput.value : state.date).trim();
    if (isEn) {
      var datePart = rawDate ? (' in ' + rawDate) : '';
      return "Hi Elvis, I'm interested in a tour in " + state.destination + 
             " focused on " + state.interest + 
             " for " + state.group + datePart + 
             ". What availability do you have?";
    } else {
      var datePartEs = rawDate ? (' en ' + rawDate) : '';
      return "Hola Elvis, me interesa un tour en " + state.destination + 
             " enfocado en " + state.interest + 
             " para " + state.group + datePartEs + 
             ". ¿Qué disponibilidad tienes?";
    }
  }

  function updateOutput() {
    var msg = buildMessage();
    if (previewEl) {
      previewEl.textContent = '“' + msg + '”';
    }
    if (waBtn) {
      waBtn.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
    }
    if (emailLink) {
      var subject = isEn ? ('Tour Inquiry — ' + state.destination) : ('Consulta de Tour — ' + state.destination);
      emailLink.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(msg);
    }
  }

  // Handle pill buttons
  var pillGroups = planner.querySelectorAll('.pill-group');
  pillGroups.forEach(function (group) {
    var param = group.getAttribute('data-param');
    var buttons = group.querySelectorAll('.pill-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        state[param] = btn.getAttribute('data-value') || btn.textContent.trim();
        updateOutput();
      });
    });
  });

  // Handle date input
  if (dateInput) {
    dateInput.addEventListener('input', function () {
      state.date = dateInput.value;
      updateOutput();
    });
  }

  // Initial render
  updateOutput();
});
