"use strict"

let output = document.querySelector('.output');

textarea.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        e.preventDefault();
        const command = parseCommand(textarea.value);
        if (command.command == 'ls') {
            addOutput(textarea.value, ls())
        } else if (command.command == 'cd') {
            if (command.param1) {
                const prevPath = getPath();
                if (cd(command.param1)) {
                    addOutput(textarea.value, '', prevPath);
                } else {
                    addOutput(textarea.value, `Folder "${command.param1}" does not exist`, prevPath)
                }
            } else {
                addOutput(textarea.value, 'You need to provide the parameter', prevPath);
            }
        } else if (command.command == 'mkdir') {
            if (command.param1) {
                if (mkdir(command.param1)) {
                    addOutput(textarea.value, `Folder "${command.param1}" created`);
                } else {
                    addOutput(textarea.value, `Folder "${command.param1}" already exist`);
                }
            } else {
                addOutput(textarea.value, 'You need to provide the parameter');
            }
        } else if (command.command == 'rmdir') {
            if (command.param1) {
                if (rmdir(command.param1)) {
                    addOutput(textarea.value, `Folder "${command.param1}" deleted`);
                } else {
                    addOutput(textarea.value, `Folder "${command.param1}" does not exist`);
                }
            } else {
                addOutput(textarea.value, 'You need to provide the parameter');
            }
        } else if (command.command == 'mkfile') {
            if (command.param1) {
                if (mkfile(command.param1)) {
                    addOutput(textarea.value, `File "${command.param1}" created`);
                } else {
                    addOutput(textarea.value, `File "${command.param1}" already exist`);
                }
            } else {
                addOutput(textarea.value, 'You need to provide the parameter');
            }
        } else if (command.command == 'rmfile') {
            if (command.param1) {
                if (rmfile(command.param1)) {
                    addOutput(textarea.value, `File "${command.param1}" deleted`);
                } else {
                    addOutput(textarea.value, `File "${command.param1}" does not exist`);
                }
            } else {
                addOutput(textarea.value, 'You need to provide the parameter');
            }
        } else if (command.command == 'rndir') {
            if (command.param1 && command.param2) {
                if (rndir(command.param1, command.param2)) {
                    addOutput(textarea.value, `Folder "${command.param1}" renamed to "${command.param2}"`);
                } else {
                    addOutput(textarea.value, `Folder "${command.param1}" failed to rename:(`);
                }
            } else {
                addOutput(textarea.value, 'You need to provide the parameter');
            }
        } else if (command.command == 'rnfile') {
            if (command.param1 && command.param2) {
                if (rnfile(command.param1, command.param2)) {
                    addOutput(textarea.value, `File "${command.param1}" renamed to "${command.param2}"`);
                } else {
                    addOutput(textarea.value, `File "${command.param1}" failed to rename:\\`);  
                }
            } else {
                addOutput(textarea.value, 'You need to provide the parameter');
            }
        } else if (command.command == 'cat') {
            if (command.param1) {
                const data = getData(command.param1);
                if (data) {
                    addOutput(textarea.value, data);
                } else {
                    addOutput(textarea.value, `File "${command.param1}" does not exist, do not worry:):):)`);  
                }
            } else {
                addOutput(textarea.value, 'You need to provide the parameter');
            }
        } else if (command.command == 'set') {
            if (command.param1 && command.param2) {
                if (setData(command.param1, command.param2)) {
                    addOutput(textarea.value, `File "${command.param1}" changed`);
                } else {
                    addOutput(textarea.value, `File "${command.param1}" does not exist:\\`);  
                }
            } else {
                addOutput(textarea.value, 'You need to provide the parameter');
            }
        } else {
            addOutput(textarea.value, `Unknown command: ${command.command}`);
        }
        textarea.value = '';
        setCurrentPath(getPath());
    }
});

function setCurrentPath(path) {
    let spanPath = document.querySelectorAll('span.path');
    spanPath = spanPath[spanPath.length - 1];
    spanPath.innerHTML = path;
}

function addOutput(command, text, path = getPath()) {
    output.insertAdjacentHTML('beforeend', `<p><span class="user">user@group</span>:<span class="path">${path}</span>$ ${command}<br>${text}</p>`);
}

function parseCommand(command) {
    return {
        command: command.split(' ')[0],
        param1: command.split(' ')[1] || null,
        param2: command.split(' ')[2] || null
    };
}
