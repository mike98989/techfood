<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SlaughterHeadMeatMidriff extends Model
{
    use HasFactory;
    protected $guarded=[];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }
    public function animal(): HasOne{
        return $this->hasOne(DrillSampleAnimals::class, 'id','animal_id');
    }

    public function product(): HasOne{
        return $this->hasOne(DrillSampleProducts::class, 'id','product_id');
    }
}
