namespace DataLayer.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations.Schema;

    public class BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
    }
}