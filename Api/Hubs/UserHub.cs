namespace Api.Hubs
{
    using System;
    using System.Threading.Tasks;

    using Core.Dtos;
    using Core.Logic.Users;

    using Microsoft.AspNetCore.SignalR;

    public class UserHub : BaseHub
    {
        private readonly UserReader userReader;
        private readonly UserWriter userWriter;

        public UserHub(UserReader userReader, UserWriter userWriter)
        {
            this.userReader = userReader;
            this.userWriter = userWriter;
        }

        public async Task GetAll()
        {
            var users = userReader.GetAllDto();
            await this.CurrentClient.SendAsync("Get", users);
        }
        
        public async Task GetWithUserContext(Guid userId)
        {
            var userWithUserContext = userReader.GetWithUserContext(userId);
            await this.CurrentClient.SendAsync("Get", userWithUserContext);
        }
        
        public async Task Create(UserDto userDto)
        {
            var userId = userWriter.Create(userDto);
            await this.CurrentClient.SendAsync("Get", userId);
            
            var users = userReader.GetAllDto();
            await this.Clients.All.SendAsync("Get", users);
        }

        public async Task Update(UserDto userDto)
        {
            userWriter.Update(userDto);
            await GetWithUserContext(userDto.Id);
        }
    }
}