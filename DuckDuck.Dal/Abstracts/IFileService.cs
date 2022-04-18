using System.Collections.Generic;
using System.Threading.Tasks;

namespace DuckDuck.Dal.Abstracts
{
    public interface IFileService
    {
        /// <summary>
        /// Save multiline data to specified file
        /// </summary>
        /// <returns></returns>
        Task SaveDataLinesToFile(string basePath, string filename, IEnumerable<string> text);

        /// <summary>
        /// Save singleline data to specified file
        /// </summary>
        /// <returns></returns>
        Task SaveSingleLineToFile(string basePath, string filename, string text);

        /// <summary>
        /// Read data from specified file
        /// </summary>
        /// <returns></returns>
        string[] GetFileDataLines(string path);
    }
}