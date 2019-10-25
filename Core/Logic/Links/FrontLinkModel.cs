using System;

namespace Core.Logic.Links
{
    public class FrontLinkModel
    {
        public Guid? Id { get; set; }
        public string Url { get; set; }
        public string Service { get; set; }
        public string Description { get; set; }
    }
}