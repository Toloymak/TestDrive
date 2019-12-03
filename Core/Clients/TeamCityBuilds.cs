using System.Collections.Generic;

namespace Core.Clients
{
    public class TeamCityBuilds<T>
    {
        public IList<T> Build { get; set; }
    }
}