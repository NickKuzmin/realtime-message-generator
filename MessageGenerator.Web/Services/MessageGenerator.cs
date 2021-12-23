using System;
using System.Collections.Generic;
using System.Linq;
using MessageGenerator.Web.Models;

namespace MessageGenerator.Web.Services
{
    public interface IMessageGenerator
    {
        IEnumerable<MessageApiModel> GenerateMessages(int count);
    }

    public class MessageGenerator : IMessageGenerator
    {
        private static readonly string[] Words = {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public IEnumerable<MessageApiModel> GenerateMessages(int count)
        {
            var random = new Random();

            return Enumerable.Range(1, count).Select(x => new MessageApiModel
            {
                Uid = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                Content = string.Join(", ", Words.OrderBy(_ => random.Next()))
            });
        }
    }
}
