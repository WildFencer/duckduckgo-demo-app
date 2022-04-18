using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DuckDuck.Dto
{
    public class DuckDuckGoListAndHistory
    {
        public IEnumerable<DuckDuckGoSimplifiedListItem> Links { get; set; }
        public IEnumerable<string> Queries { get; set; }
    }
}