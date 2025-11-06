// Módulo de modales: exporta initModals y helpers para abrir/ cerrar modales.
let _modalForm = null;
let _modalConfirm = null;
let _cancelarForm = null;
let _btnNo = null;
let _btnSi = null;

let _onConfirm = null;

export function initModals({ btnAgregarId = 'btnAgregar', modalFormId = 'modalForm', cancelarFormId = 'cancelarForm', modalConfirmId = 'modalConfirm', btnNoId = 'btnNo', btnSiId = 'btnSi' } = {}) {
  _modalForm = document.getElementById(modalFormId);
  _modalConfirm = document.getElementById(modalConfirmId);
  _cancelarForm = document.getElementById(cancelarFormId);
  _btnNo = document.getElementById(btnNoId);
  _btnSi = document.getElementById(btnSiId);

  // btnAgregar can be handled by caller (products module) or we can attach a basic handler
  const btnAgregar = document.getElementById(btnAgregarId);
  if (btnAgregar) {
    btnAgregar.addEventListener('click', () => openFormModal('Agregar producto'));
  }

  if (_cancelarForm) _cancelarForm.addEventListener('click', () => closeFormModal());
  if (_btnNo) _btnNo.addEventListener('click', () => closeConfirmModal());
  if (_btnSi) _btnSi.addEventListener('click', () => {
    if (typeof _onConfirm === 'function') _onConfirm();
    closeConfirmModal();
  });
}

export function openFormModal(title = 'Modal', prefill = null) {
  if (!_modalForm) _modalForm = document.getElementById('modalForm');
  if (!_modalForm) return;
  const titleEl = _modalForm.querySelector('#modalTitle');
  if (titleEl) titleEl.innerText = title;
  _modalForm.style.display = 'flex';
  // caller will handle form submit and prefilling if needed
}

export function closeFormModal() {
  if (_modalForm) _modalForm.style.display = 'none';
}

export function openConfirmModal(message = '¿Seguro?', onConfirm = null) {
  if (!_modalConfirm) _modalConfirm = document.getElementById('modalConfirm');
  if (!_modalConfirm) return;
  // set message if any
  const p = _modalConfirm.querySelector('.modal-content p');
  if (p && message) p.innerText = message;
  _onConfirm = onConfirm;
  _modalConfirm.style.display = 'flex';
}

export function closeConfirmModal() {
  if (_modalConfirm) _modalConfirm.style.display = 'none';
}
