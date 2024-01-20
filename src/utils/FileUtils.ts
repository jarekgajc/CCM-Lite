
export const FileUtils = {
    download(content: string, fileName: string) {
        const blob = new Blob([content]);
        
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        
        a.href = url;
        a.download = fileName;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },
    toText(file: any): Promise<string> {
        return new Promise((resolve, reject) => {
            if (file) {
                const reader = new FileReader();

                reader.onload = () => {
                    resolve(reader.result as string);
                };

                reader.readAsText(file);
            } else {
                console.log('No file selected.');
            }
        });
    }
};