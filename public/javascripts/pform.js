  class ProductForm {
            constructor() {
                this.form = document.getElementById('productForm');
                this.uploadArea = document.getElementById('uploadArea');
                this.fileInput = document.getElementById('productImages');
                this.imagePreview = document.getElementById('imagePreview');
                this.selectedImages = [];
                
                this.initializeEventListeners();
                this.initializeCharacterCounters();
            }

            initializeEventListeners() {
                // Form submission
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));

                // Upload area events
                this.uploadArea.addEventListener('click', () => this.fileInput.click());
                this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
                this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
                this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));

                // File input change
                this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
            }

            initializeCharacterCounters() {
                const nameInput = document.getElementById('productName');
                const descInput = document.getElementById('productDescription');
                const nameCount = document.getElementById('nameCount');
                const descCount = document.getElementById('descCount');

                nameInput.addEventListener('input', () => {
                    const count = nameInput.value.length;
                    nameCount.textContent = count;
                    nameCount.parentElement.className = 'character-count ' + 
                        (count > 90 ? 'danger' : count > 75 ? 'warning' : '');
                });

                descInput.addEventListener('input', () => {
                    const count = descInput.value.length;
                    descCount.textContent = count;
                    descCount.parentElement.className = 'character-count ' + 
                        (count > 450 ? 'danger' : count > 400 ? 'warning' : '');
                });
            }

            handleDragOver(e) {
                e.preventDefault();
                this.uploadArea.classList.add('dragover');
            }

            handleDragLeave(e) {
                e.preventDefault();
                this.uploadArea.classList.remove('dragover');
            }

            handleDrop(e) {
                e.preventDefault();
                this.uploadArea.classList.remove('dragover');
                const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                this.processFiles(files);
            }

            handleFileSelect(e) {
                const files = Array.from(e.target.files);
                this.processFiles(files);
            }

            processFiles(files) {
                files.forEach(file => {
                    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => this.addImagePreview(e.target.result, file);
                    reader.readAsDataURL(file);
                });
            }

            addImagePreview(src, file) {
                const imageItem = document.createElement('div');
                imageItem.className = 'image-item';
                imageItem.innerHTML = `
                    <img src="${src}" alt="Product Image">
                    <button type="button" class="remove-image" onclick="productForm.removeImage(this)">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                this.selectedImages.push(file);
                this.imagePreview.appendChild(imageItem);
            }

            removeImage(button) {
                const imageItem = button.closest('.image-item');
                const index = Array.from(this.imagePreview.children).indexOf(imageItem);
                this.selectedImages.splice(index, 1);
                imageItem.remove();
            }

            showError(elementId, message) {
                const errorElement = document.getElementById(elementId);
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }

            hideError(elementId) {
                const errorElement = document.getElementById(elementId);
                errorElement.style.display = 'none';
            }

            validateForm() {
                let isValid = true;
                
                // Reset all errors
                this.hideError('nameError');
                this.hideError('priceError');
                this.hideError('descError');

                // Validate product name
                const name = document.getElementById('productName').value.trim();
                if (!name) {
                    this.showError('nameError', 'Product name is required');
                    isValid = false;
                } else if (name.length < 2) {
                    this.showError('nameError', 'Product name must be at least 2 characters');
                    isValid = false;
                }

                // Validate price
                const price = document.getElementById('productPrice').value;
                if (!price || parseFloat(price) <= 0) {
                    this.showError('priceError', 'Please enter a valid price');
                    isValid = false;
                }

                // Validate description
                const description = document.getElementById('productDescription').value.trim();
                if (!description) {
                    this.showError('descError', 'Product description is required');
                    isValid = false;
                } else if (description.length < 10) {
                    this.showError('descError', 'Description must be at least 10 characters');
                    isValid = false;
                }

                return isValid;
            }

            handleSubmit(e) {
                if (!this.validateForm()) {
                    e.preventDefault(); // Only prevent if validation fails
                    return false;
                }
                // If validation passes, let the form submit naturally to backend
                return true;
            }

            resetForm() {
                this.form.reset();
                this.imagePreview.innerHTML = '';
                this.selectedImages = [];
                document.getElementById('nameCount').textContent = '0';
                document.getElementById('descCount').textContent = '0';
                
                // Hide all errors
                this.hideError('nameError');
                this.hideError('priceError');
                this.hideError('descError');
            }
        }

        // Initialize the form
        const productForm = new ProductForm();