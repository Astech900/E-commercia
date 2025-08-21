
        // // Simulate real-time updates
        // function updateStats() {
        //     const stats = document.querySelectorAll('.stat-number');
        //     // console.log(stats)
        //     stats.forEach(stat => {
        //         const current = parseInt(stat.textContent);
        //         const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        //         if (change !== 0) {
        //             stat.textContent = Math.max(0, current + change);
        //         }
        //     });
        // }
        

        // // Add click handlers for action buttons
        // document.querySelectorAll('.btn').forEach(btn => {
        //     btn.addEventListener('click', function(e) {
        //         if (this.classList.contains('btn-primary') || this.classList.contains('btn-outline-primary')) {
        //             e.preventDefault();
        //             const icon = this.querySelector('i');
        //             const originalClass = icon.className;
                    
        //             // Animate the button
        //             icon.className = 'fas fa-spinner fa-spin';
        //             this.disabled = true;
                    
        //             setTimeout(() => {
        //                 icon.className = originalClass;
        //                 this.disabled = false;
        //             }, 1000);
        //         }
        //     });
        // });

        // // Simulate real-time updates every 5 seconds
        // setInterval(() => {
        //     updateStats();
        // }, 5000);

        // // Search functionality
        // const searchInput = document.querySelector('input[placeholder*="Search"]');
        // if (searchInput) {
        //     searchInput.addEventListener('input', function() {
        //         const searchTerm = this.value.toLowerCase();
        //         const tableRows = document.querySelectorAll('#cartItemsBody tr');
                
        //         tableRows.forEach(row => {
        //             const text = row.textContent.toLowerCase();
        //             row.style.display = text.includes(searchTerm) ? '' : 'none';
        //         });
        //     });
        // }

        // // Cart items functionality
        // const selectAllCheckbox = document.getElementById('selectAll');
        // const itemCheckboxes = document.querySelectorAll('.item-checkbox');

        // // Select all functionality
        // if (selectAllCheckbox) {
        //     selectAllCheckbox.addEventListener('change', function() {
        //         itemCheckboxes.forEach(checkbox => {
        //             checkbox.checked = this.checked;
        //         });
        //     });
        // }

        // // Individual checkbox handling
        // itemCheckboxes.forEach(checkbox => {
        //     checkbox.addEventListener('change', function() {
        //         const checkedBoxes = document.querySelectorAll('.item-checkbox:checked').length;
        //         const totalBoxes = itemCheckboxes.length;
                
        //         if (selectAllCheckbox) {
        //             selectAllCheckbox.checked = checkedBoxes === totalBoxes;
        //             selectAllCheckbox.indeterminate = checkedBoxes > 0 && checkedBoxes < totalBoxes;
        //         }
        //     });
        // });

        // // Mark item as received functionality
        // document.querySelectorAll('#cartItemsBody .btn-primary, #cartItemsBody .btn-success').forEach(btn => {
        //     btn.addEventListener('click', function() {
        //         if (!this.disabled) {
        //             const row = this.closest('tr');
        //             const statusBadge = row.querySelector('.status-badge');
                    
        //             // Show loading state
        //             this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        //             this.disabled = true;
                    
        //             setTimeout(() => {
        //                 // Update status to received
        //                 statusBadge.className = 'status-badge bg-success text-white';
        //                 statusBadge.textContent = 'Received';
                        
        //                 // Update button
        //                 this.className = 'btn btn-success btn-sm me-1';
        //                 this.innerHTML = '<i class="fas fa-check"></i>';
        //                 this.title = 'Already Received';
                        
        //                 // Add visual feedback
        //                 row.classList.add('table-success');
        //                 setTimeout(() => {
        //                     row.classList.remove('table-success');
        //                 }, 2000);
                        
        //             }, 1000);
        //         }
        //     });
        // });

        // // Report issue functionality
        // document.querySelectorAll('#cartItemsBody .btn-warning, #cartItemsBody .btn-danger').forEach(btn => {
        //     btn.addEventListener('click', function() {
        //         const row = this.closest('tr');
        //         const productName = row.querySelector('h6').textContent;
                
        //         // Show confirmation dialog (simplified)
        //         if (confirm(`Report an issue with "${productName}"?`)) {
        //             this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    
        //             setTimeout(() => {
        //                 alert(`Issue reported for "${productName}". Support team has been notified.`);
        //                 this.innerHTML = '<i class="fas fa-check"></i>';
        //                 this.className = 'btn btn-secondary btn-sm';
        //                 this.disabled = true;
        //                 this.title = 'Issue Reported';
        //             }, 1000);
        //         }
        //     });
        // });

        // // Mark All Received functionality
        // document.querySelector('[data-action="mark-all"]')?.addEventListener('click', function() {
        //     const pendingItems = document.querySelectorAll('#cartItemsBody .bg-warning, #cartItemsBody .bg-primary');
            
        //     if (confirm('Mark all pending/processing items as received?')) {
        //         this.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Processing...';
        //         this.disabled = true;
                
        //         let delay = 0;
        //         pendingItems.forEach(badge => {
        //             setTimeout(() => {
        //                 badge.className = 'status-badge bg-success text-white';
        //                 badge.textContent = 'Received';
                        
        //                 const row = badge.closest('tr');
        //                 const btn = row.querySelector('.btn-primary, .btn-outline-primary');
        //                 if (btn) {
        //                     btn.className = 'btn btn-success btn-sm me-1';
        //                     btn.disabled = true;
        //                 }
        //             }, delay);
        //             delay += 200;
        //         });
                
        //         setTimeout(() => {
        //             this.innerHTML = '<i class="fas fa-check-all me-1"></i>All Marked';
        //             this.className = 'btn btn-success btn-sm me-2';
        //         }, delay + 500);
        //     }
        // });
