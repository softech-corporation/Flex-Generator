// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import fs = require('fs');
import path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "flex-generator" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('flex-generator.start', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

    if (!vscode.workspace) {
      return vscode.window.showErrorMessage('Please open a project folder first');
    }

    if (!vscode.workspace.workspaceFolders) {
      return;
    }

    const folderPath = vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1];

    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Flex Generator</title>
    </head>
    
    <body>
      <h1>Hello Flex Generator</h1>
    </body>
    
    </html>`;

    fs.writeFile(path.join(folderPath, 'index.html'), htmlContent, (err) => {
      if (err) {
        return vscode.window.showErrorMessage('Failed to create boilerplate file!');
      }
      vscode.window.showInformationMessage('Created boilerplate files');
    });
  });

  context.subscriptions.push(disposable);

  // ---------------------------------

  let disposableSqlCRUD = vscode.commands.registerCommand('flex-generator.sql.crud', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

    if (!vscode.workspace) {
      return vscode.window.showErrorMessage('Please open a project folder first');
    }

    if (!vscode.workspace.workspaceFolders) {
      return;
    }

    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      return vscode.window.showErrorMessage('Please open a file first');
    }

    const selectedText = editor.document.getText(editor.selection);

    const folderPath = vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1];

    const sqlContent = `
    INSERT INTO ${selectedText} (column1, column2, column3, ...)
    `;

    fs.writeFile(path.join(folderPath, 'index.sql'), sqlContent, (err) => {
      if (err) {
        return vscode.window.showErrorMessage('Failed to create sql file!');
      }
      vscode.window.showInformationMessage('Created sql file');
    });
  });

  context.subscriptions.push(disposableSqlCRUD);
}

// This method is called when your extension is deactivated
export function deactivate() {}
