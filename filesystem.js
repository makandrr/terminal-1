"use strict"

const textarea = document.querySelector(".textarea");

textarea.focus();
document.body.onclick = textarea.focus;

//File system

const filesystem = {
    name: 'root',
    type: 'folder',
    content: [
        {
            name: 'swapfile',
            extension: 'bin',
            type: 'file',
            content: '0100010111010010101001010011100001011010110'
        },
        {
            name: 'home',
            type: 'folder',
            parent: '',
            content: []
        }
    ]
};

filesystem.content[1].parent = filesystem;

let currentFolder = filesystem;

let currentPath = [];

function isExistFolder(folderName) {
    let isExist = false;
    currentFolder.content.forEach(function(elem) {
        if (elem.name == folderName && elem.type == 'folder') {
            isExist = true;
        }
    });
    return isExist;
}

function isExistFile(fileName) {
    let isExist = false;
    currentFolder.content.forEach(function(elem) {
        if (elem.name == fileName.split('.')[0] && elem.extension == fileName.split('.')[1] && elem.type == 'file') {
            isExist = true;
        }
    });
    return isExist;
}

function cd(folderName) {
    let isExist = isExistFolder(folderName);
    if (isExist) {
        let nextFolder;
        currentFolder.content.forEach(function(elem) {
            if (elem.name == folderName) {
                nextFolder = elem;
            }
        });
        
        currentFolder = nextFolder;
        currentPath.push(folderName);
        return 1;
    } else if (folderName == '..') {
        if (currentFolder.parent) {
            currentFolder = currentFolder.parent;
            currentPath.pop();    
        }
        return 1;
    } else if (folderName == '/') {
        currentFolder = filesystem;
        currentPath = [];
        return 1;
    }
    return 0;
}

function getPath() {
    return '/' + currentPath.join('/');
}

function ls() {
    const list = [];
    currentFolder.content.forEach(function(elem) {
        if (elem.type == 'folder') {
            list.push(`<span class="folder">${elem.name}</span>`);
        } else {
            list.push(`<span class="file">${elem.name}.${elem.extension}</span>`);
        }
    });
    return list.join('\n');
}

function mkdir(folderName) {
    let isntExist = !isExistFolder(folderName);
    if (isntExist) {
        currentFolder.content.push({
            name: folderName,
            type: 'folder',
            parent: currentFolder,
            content: []
        });
        return 1;
    }
    return 0;
}

function mkfile(fileName) {
    let isntExist = !isExistFile(fileName);
    console.log(isntExist);
    if (isntExist) {
        currentFolder.content.push({
            name: fileName.split('.')[0],
            extension: fileName.split('.')[1] || 'txt',
            type: 'file',
            content: ''
        });
        return 1;
    }
    return 0;
}

function rmdir(folderName) {
    if (isExistFolder(folderName)) {
        let rmFolder;
        currentFolder.content.forEach(function(elem) {
            if (elem.name == folderName) {
                rmFolder = elem;
            }
        });
        currentFolder.content = currentFolder.content.filter(function(elem) {
            if (elem.type == 'folder' && elem.name == folderName) {
                return false;
            }
            return true;
        });
        return 1;
    }
    return 0;
}

function rmfile(fileName) {
    if (isExistFile(fileName)) {
        let rmFile;
        currentFolder.content.forEach(function(elem) {
            if (elem.name == fileName.split('.')[0] && elem.extension == fileName.split('.')[1]) {
                rmFile = elem;
            }
        });
        currentFolder.content = currentFolder.content.filter(function(elem) {
            if (elem.type == 'file' && elem.name == fileName.split('.')[0] && elem.extension == fileName.split('.')[1]) {
                return false;
            }
            return true;
        });
        return 1;
    }
    return 0;
}

function rndir(folderName, newName) {
    let folder;
    currentFolder.content.forEach((elem) => {
        if (elem.name == folderName && elem.type == 'folder') {
            folder = elem;
        }
    });

    if (!isExistFolder(newName)) {
        folder.name = newName;
        return 1;
    }
    return 0;
}

function rnfile(fileName, newName) {
    let file;
    currentFolder.content.forEach((elem) => {
        if (elem.name == fileName.split('.')[0] && elem.type == 'file' && elem.extension == fileName.split('.')[1]) {
            file = elem;
        }
    });

    if (!isExistFile(newName)) {
        file.name = newName.split('.')[0];
        file.extension = newName.split('.')[1];
        return 1;
    }
    return 0;
}

function getData(fileName) {
    if (isExistFile(fileName)) {
        let file;
        currentFolder.content.forEach((elem) => {
            if (elem.name == fileName.split('.')[0] && elem.type == 'file' && elem.extension == fileName.split('.')[1]) {
                file = elem;
            }
        });
        
        return file.content;
    }
    return 0;
}

function setData(fileName, data) {
    if (isExistFile(fileName)) {
        let file;
        currentFolder.content.forEach((elem) => {
            if (elem.name == fileName.split('.')[0] && elem.type == 'file' && elem.extension == fileName.split('.')[1]) {
                file = elem;
            }
        });
        
        file.content = data;
        return 1;
    }
    return 0;
}