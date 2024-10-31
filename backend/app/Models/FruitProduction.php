<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;

class FruitProduction extends Model
{
    use HasFactory;
    protected $table="fruit_productions";
    protected $guarded = [];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }

    public function status_type(): HasOne{
        return $this->hasOne(FruitProductionStatusTypes::class, 'id','status');
        
    }

}
