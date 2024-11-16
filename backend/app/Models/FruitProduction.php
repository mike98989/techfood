<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;

class FruitProduction extends Model
{
    use HasFactory;
    protected $table="fruit_production";
    protected $guarded = [];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }

    public function status_type(): HasOne{
        return $this->hasOne(FruitProductionStatusTypes::class, 'id','status');
    }
    public function section(): HasOne{
        return $this->hasOne(Fruits::class, 'id','section_id');
    }
    public function cause(): HasOne{
        return $this->hasOne(FruitProductionCauses::class, 'id','cause_id');
    }

    public function deviation(): HasOne{
        return $this->hasOne(FruitProductionDeviationTypes::class, 'id','deviation_type_id');
    }

}
