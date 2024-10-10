const vscode = require('vscode')
const path  = require('path')
 function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.calculateRelativePath', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }
        const document = editor.document;
        const currentFilePath = document.uri.fsPath;

        // 如果选择的是自定义路径
        const targetPath = vscode.window.showInputBox({ prompt: '请输入目标文件路径' })

        targetPath.then(pathInput => {
            if (pathInput) {
                const targetAbsolutePath = path.resolve(pathInput);
                const relativePath = path.relative(path.dirname(currentFilePath), targetAbsolutePath);

                // 在光标位置插入相对路径
                editor.edit(editBuilder => {
                    const position = editor.selection.active;
                    editBuilder.insert(position, relativePath);
                });
            } else {
                vscode.window.showErrorMessage('未输入目标路径');
            }
        });
    });

    context.subscriptions.push(disposable);
}
function deactivate() {}
module.exports = {
    activate,
    deactivate
}

