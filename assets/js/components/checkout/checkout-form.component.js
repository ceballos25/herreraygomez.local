export function renderCheckoutForm() {
  return `
    <div class="checkout-form-card">
      <h5 class="mb-3">Datos personales</h5>
      <form id="checkout-form" novalidate>
        <div class="row g-3">
          <div class="col-md-6"><label for="firstName" class="form-label">Nombre *</label><input type="text" class="form-control" id="firstName" name="firstName" required autocomplete="given-name" placeholder="Juan"></div>
          <div class="col-md-6"><label for="lastName" class="form-label">Apellido *</label><input type="text" class="form-control" id="lastName" name="lastName" required autocomplete="family-name" placeholder="Pérez"></div>
          <div class="col-md-6"><label for="email" class="form-label">Correo electrónico *</label><input type="email" class="form-control" id="email" name="email" required autocomplete="email" placeholder="correo@ejemplo.com"></div>
          <div class="col-md-6"><label for="phone" class="form-label">Celular *</label><input type="tel" class="form-control" id="phone" name="phone" required autocomplete="tel" placeholder="3001234567" pattern="[0-9]{10}"></div>
        </div>
        <h5 class="mt-4 mb-3">Dirección de envío</h5>
        <div class="row g-3">
          <div class="col-12"><label for="address" class="form-label">Dirección *</label><input type="text" class="form-control" id="address" name="address" required autocomplete="street-address" placeholder="Calle 123 #45-67, Apto 801"></div>
          <div class="col-md-6"><label for="city" class="form-label">Ciudad *</label><input type="text" class="form-control" id="city" name="city" required autocomplete="address-level2" placeholder="Medellín"></div>
          <div class="col-md-6"><label for="state" class="form-label">Departamento *</label>
            <select class="form-select" id="state" name="state" required autocomplete="address-level1">
              <option value="">Seleccionar...</option>
              <option value="Cundinamarca">Cundinamarca</option>
              <option value="Antioquia">Antioquia</option>
              <option value="Valle del Cauca">Valle del Cauca</option>
              <option value="Atlántico">Atlántico</option>
              <option value="Santander">Santander</option>
              <option value="Bolívar">Bolívar</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div class="col-md-6"><label for="postalCode" class="form-label">Código postal *</label><input type="text" class="form-control" id="postalCode" name="postalCode" required autocomplete="postal-code" placeholder="110111"></div>
          <div class="col-12"><label for="notes" class="form-label">Notas del pedido (opcional)</label><textarea class="form-control" id="notes" name="notes" rows="2" placeholder="Instrucciones especiales de entrega..."></textarea></div>
        </div>
        <div class="form-check mt-4">
          <input class="form-check-input" type="checkbox" id="terms" name="terms" required>
          <label class="form-check-label" for="terms">Acepto los <a href="#">términos y condiciones</a> y la <a href="#">política de privacidad</a> *</label>
        </div>
        <button type="submit" class="btn btn-primary btn-lg w-100 mt-4" id="checkout-submit">
          <i class="bi bi-shield-lock me-2"></i>Pagar con PSE
        </button>
        <p class="text-muted text-center small mt-3"><i class="bi bi-lock-fill"></i> Tu pago es procesado de forma segura por OpenPay</p>
        <p class="text-muted text-center small mt-1 mb-0"><i class="bi bi-info-circle"></i> Serás redirigido a la pasarela PSE de OpenPay para completar el pago.</p>
      </form>
    </div>`;
}
