using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DatabaseLayer.Entities.Base
{
    public class EntityBase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
    }
}