using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DuckDuck.Helpers
{
    public class StringParseHelper
    {
        public static string GetTitleFromLink(string linkHtml)
        {
            const string pattern = @">(.+)<";
            var reg = new Regex(pattern);

            var res = reg.Match(linkHtml);
            if (res.Success && res.Groups.Count > 1)
                return res.Groups[1].Value;
            
            return linkHtml;
        }
    }
}