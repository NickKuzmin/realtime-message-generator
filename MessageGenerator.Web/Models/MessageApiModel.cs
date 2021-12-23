using System;

namespace MessageGenerator.Web.Models
{
    public class MessageApiModel
    {
        public Guid Uid { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Content { get; set; }
    }
}
