using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using DuckDuck.Dal.Abstracts;

namespace DuckDuck.Dal
{
    public class FileService : IFileService
    {
        public FileService()
        {
        }

        /// <inheritdoc />
        public async Task SaveDataLinesToFile(string basePath, string filename, IEnumerable<string> text)
        {
            if (!System.IO.File.Exists($"{basePath}\\{filename}"))
            {
                Directory.CreateDirectory(basePath);
            }
            await File.WriteAllLinesAsync($"{basePath}\\{filename}", text);
        }

        /// <inheritdoc />
        public async Task SaveSingleLineToFile(string basePath, string filename, string text)
        {
            if (!System.IO.File.Exists($"{basePath}\\{filename}"))
            {
                Directory.CreateDirectory(basePath);
            }
            await File.WriteAllTextAsync($"{basePath}\\{filename}", text);
        }

        /// <inheritdoc />
        public string[] GetFileDataLines(string path)
        {
             if (!System.IO.File.Exists(path))
                return new string[0];

            return System.IO.File.ReadAllLines(path);
        }
    }
}