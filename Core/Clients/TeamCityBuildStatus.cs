using System;

namespace Core.Clients
{
    public class TeamCityBuildStatus
    {
        public BuildStatus BuildStatus { get; set; }
        public string BranchName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
    }
}