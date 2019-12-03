using System;
using System.Diagnostics;
using System.Linq;

namespace Core.Clients
{
    public class TeamCityClient
    {
        private const string TcPath = "https://tc.skbkontur.ru/app/rest";
        
        public TeamCityBuildStatus GetLastBuildStatus(string configName)
        {
            var buildInfo = GetInfo(configName).Build.FirstOrDefault();

            var startDate = ParseDate(buildInfo.StartDate);
            var finishDate = ParseDate(buildInfo.FinishDate);
            var status = new TeamCityBuildStatus()
            {
                BuildStatus = buildInfo.Status.ToLower() == "success".ToLower()
                    ? BuildStatus.Success
                    : buildInfo.Status.ToLower() == "failure".ToLower()
                        ? BuildStatus.Failure
                        : BuildStatus.Error,
                BranchName = buildInfo.BranchName,
                StartDate =  startDate,
                FinishDate = finishDate
            };
            
            return status;
        }
        
        private TeamCityBuilds<RawTeamCityBuildInfo> GetInfo(string configName)
        {
            var restHelper = new RestHelper(TcPath);
            var result = restHelper.ExecuteRequest<RawTeamCityBuildInfo>(restHelper.BuildUri(configName));
            return result;
        }

        private DateTime ParseDate(string date)
        {
            var format = "yyyyMdTHHmmss";
            var croppedDate = date.Substring(0, date.Length - 5);
            var dateTime = DateTime.ParseExact(croppedDate, format, null);

            return dateTime;
        }
    }
}