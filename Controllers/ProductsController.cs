﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Autorizacion.Data;
using Autorizacion.Models;
using Microsoft.AspNetCore.Authorization;

namespace aspnetcore_with_reactspa.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public ProductsController(NorthwindContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("sales")]
        public IEnumerable<Object> GetSalesFromProduct(String name, DateTime startDate, DateTime endDate)
        {
            return _context.Products

                .Where(p => p.ProductName == name)
                .Join(
                    _context.Movementdetails,
                    p => p.ProductId,
                    md => md.ProductId,
                    (p, md) => new
                    {
                        Producto = p.ProductId,
                        Movimiento = md.MovementId,
                        Nombre = p.ProductName,
                        Cantidad = md.Quantity
                    }
                )
                .Join(
                    _context.Movements,
                    md => md.Movimiento,
                    m => m.MovementId,
                    (md, m) => new
                    {
                        md.Producto,
                        md.Nombre,
                        md.Cantidad,
                        m.Date,
                        m.OriginWarehouseId,
                        m.Type
                    }
                )
                .Where(m => m.Date >= startDate
                    && m.Date <= endDate
                    && m.Type == "VENTAS"
                );
                
                
        }

        // GET: api/Products
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
          if (_context.Products == null)
          {
              return NotFound();
          }
            return await _context.Products.OrderByDescending(p => p.ProductId).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
          if (_context.Products == null)
          {
              return NotFound();
          }
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            
          if (_context.Products == null)
          {
              return Problem("Entity set 'NorthwindContext.Products'  is null.");
          }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.ProductId == id)).GetValueOrDefault();
        }
    }
}
