<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LabInputs extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','PO_number', 'batch_number', 'protein_value', 'lactose_value', 'water_value', 'result_date'];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }
    protected static function newFactory()
    {
        return \Database\Factories\LabInputsFactory::new();
    }
}
