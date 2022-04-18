using System.Collections.Generic;

namespace DuckDuck.Services.Models
{
    public class DuckDuckGo
    {
        public string Heading { get; set; }
        public IEnumerable<RelatedTopics> RelatedTopics { get; set; }
    }

    public class RelatedTopics
    {
        public string Name { get; set; }
        public string FirstURL { get; set; }
        public string Result { get; set; }
        public string Text { get; set; }
        public IEnumerable<RelatedTopics> Topics { get; set; }
    }
}