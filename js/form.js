/**
 * Custom order form — budget slider, file upload label,
 * inline validation, success/reset states.
 */
(function () {

  /* ── Budget slider ── */
  var budgetInput = document.getElementById('field-budget');
  var budgetLabel = document.getElementById('budget-label');

  function updateBudget(val) {
    budgetLabel.textContent = Number(val) >= 2000 ? '€2000+' : '€' + val;
  }

  if (budgetInput) {
    budgetInput.addEventListener('input', function () {
      updateBudget(this.value);
    });
  }

  /* ── File upload label ── */
  var fileInput = document.getElementById('field-file');
  var fileNameEl = document.getElementById('file-name');

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      fileNameEl.textContent =
        this.files && this.files[0] ? this.files[0].name : 'Nessun file selezionato';
    });
  }

  /* ── Validation helpers ── */
  function showError(fieldId, message) {
    var el = document.getElementById('err-' + fieldId);
    if (!el) return;
    el.textContent = '→ ' + message;
    el.style.display = 'block';
  }

  function clearError(fieldId) {
    var el = document.getElementById('err-' + fieldId);
    if (el) el.style.display = 'none';
  }

  function clearAllErrors() {
    ['nome', 'email', 'tipo', 'desc'].forEach(clearError);
  }

  function validate(nome, email, tipo, desc) {
    var errors = {};

    if (!nome) {
      errors.nome = 'Dimmi come ti chiami';
    }

    if (!email) {
      errors.email = "Serve un'email per risponderti";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Email non valida';
    }

    if (!tipo) {
      errors.tipo = 'Scegli un tipo di prodotto';
    }

    if (!desc) {
      errors.desc = 'Raccontami la tua idea';
    } else if (desc.length < 12) {
      errors.desc = 'Dammi qualche dettaglio in più (min. 12 caratteri)';
    }

    return errors;
  }

  /* ── Form submission ── */
  var form        = document.getElementById('order-form');
  var successBox  = document.getElementById('form-success');
  var successMsg  = document.getElementById('success-msg');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submit();
    });
  }

  function submit() {
    var nome  = document.getElementById('field-nome').value.trim();
    var email = document.getElementById('field-email').value.trim();
    var tipo  = document.getElementById('field-tipo').value;
    var desc  = document.getElementById('field-desc').value.trim();

    clearAllErrors();

    var errors = validate(nome, email, tipo, desc);

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(function (pair) {
        showError(pair[0], pair[1]);
      });
      return;
    }

    var firstName = nome.split(' ')[0];
    successMsg.textContent =
      'Grazie ' + firstName + ' — ho ricevuto la tua richiesta e ti scrivo entro un paio di giorni.';

    form.style.display = 'none';
    successBox.style.display = 'block';
  }

  /* ── Reset ── */
  var resetBtn = document.getElementById('reset-btn');

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      updateBudget(150);
      if (fileNameEl) fileNameEl.textContent = 'Nessun file selezionato';
      clearAllErrors();
      successBox.style.display = 'none';
      form.style.display = 'grid';
    });
  }

})();
